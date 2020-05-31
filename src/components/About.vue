<template>
    <div>
        <el-row :gutter="40">
            <el-col :span="8">
                <h2>Essy Locust</h2>
                <h5>An extension tool for <a href="https://locust.io/" target="_blank">Locustio</a></h5>
                <p>Easy-locust is an extension tool for locust, can generate locust-file and trigger slave-nodes automatically.</p>
                <a href="https://github.com/GuoTengda1993/easy-locust" target="_blank">GitHub</a>
                <hr>
                <p>There are three actions when you finish your settings at this web page:</p>
                <p>1. <strong>Generate locust-file:</strong> Generate locust-file at your current path, the filename is "locust_file_by_web.py". Do not change the filename if you want run locust with this web. But you can change the content of this file.</p>
                <p>2. <strong>Run:</strong> If you didn't generate locust-file, it will automatically generate "locust_file_by_web.py" and run it. Otherwise, directly run it no matter you change the content.</p>
                <p>3. <strong>Run in distributed-mode:</strong> Like the second, but it will run all the slave-node except disabled nodes.</p>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <h2>Current Config</h2>
                    </el-col>
                    <el-col :span="2" class="button-col">
                        <el-button type="primary" plain size="small" @click="dialogVisible = true">Edit</el-button>
                    </el-col>
                </el-row>
                <p><strong>Host: </strong>{{ config.host }}</p>
                <p><strong>Min-Wait: </strong>{{ config.min_wait }}</p>
                <p><strong>Max-Wait: </strong>{{ config.max_wait }}</p>
                <p><strong>Request-Mode: </strong>{{ config.request_mode }}</p>
                <p><strong>Run-in-Order: </strong>
                    <a v-if="config.run_in_order">True</a>
                    <a v-else>False</a>
                </p>
                <p><strong>Content-Type: </strong>{{ config.content_type }}</p>
            </el-col>
        </el-row>

        <el-dialog title="Config" :visible.sync="dialogVisible">
            <el-form :model="config">
                <el-form-item label="Host" :label-width="formLabelWidth">
                    <el-input v-model="config.host" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Min-wait(s)" :label-width="formLabelWidth">
                    <el-input v-model="config.min_wait" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Max-wait(s)" :label-width="formLabelWidth">
                    <el-input v-model="config.max_wait" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Request Mode" :label-width="formLabelWidth">
                    <el-select v-model="config.request_mode" placeholder="Select request-mode">
                        <el-option label="FastHttpLocust" value="FastHttpLocust"></el-option>
                        <el-option label="HttpLocust" value="HttpLocust"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Content-Type" :label-width="formLabelWidth">
                    <el-select v-model="config.content_type" placeholder="Select content-type">
                        <el-option label="application/json" value="application/json"></el-option>
                        <el-option label="application/xml" value="application/xml"></el-option>
                        <el-option label="application/x-www-form-urlencoded" value="application/x-www-form-urlencoded"></el-option>
                        <el-option label="multipart/form-data" value="multipart/form-data"></el-option>
                        <el-option label="text/html" value="text/html"></el-option>
                        <el-option label="text/plain" value="text/plain"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Run-in-Order" :label-width="formLabelWidth">
                    <el-switch 
                    v-model="config.run_in_order"
                    active-value="1"
                    inactive-value="0"
                    ></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="editConfig">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data(){
        return {
            config: {
                host: '',
                min_wait: '',
                max_wait: '',
                request_mode: '',
                run_in_order: 0,
                content_type: ''
            },
            dialogVisible: false,
            formLabelWidth: '120px'
        }
    },
    mounted() {
        this.GetConfig()
    },
    methods: {
        GetConfig(){
            this.$axios.get('/config/1').then(response => (
                this.config = response.data.res
            ))
        },
        cancel(){
            this.GetConfig()
            this.dialogVisible = false
        },
        editConfig(){
            var data = {
                'host': this.config.host,
                'min_wait': this.config.min_wait,
                'max_wait': this.config.max_wait,
                'request_mode': this.config.request_mode,
                'run_in_order': parseInt(this.config.run_in_order),
                'content_type': this.config.content_type
            }
            this.$axios.put('/config/1', data).then(response => {
                if (this.messageShow(this, response)){
                    this.GetConfig()
                    this.dialogVisible = false
                }
            }).catch(error => {
                this.errorMessageShow(this, error.response)
            })
        }
    }
}
</script>