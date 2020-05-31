<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="2">
                <h2>APIs</h2>
            </el-col>
            <el-col :span="2" class="button-col">
                <el-button type="primary" plain size="small" @click="dialogAdd">Add</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline>
                        <el-form-item label="Request Data">
                            <span>{{ props.row.request_data }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
            prop="id"
            label="ID"
            width="50">
            </el-table-column>
            <el-table-column
            prop="url"
            label="URL"
            min-width="150">
            </el-table-column>
            <el-table-column
            prop="method"
            label="Method">
            </el-table-column>
            <el-table-column
            prop="weight"
            label="Weight"
            width="80">
            </el-table-column>
            <el-table-column
            prop="expect_code"
            label="Expect Code"
            width="130">
            </el-table-column>
            <el-table-column
            prop="expect_str"
            label="Expect Str"
            min-width="150">
            </el-table-column>
            <el-table-column
            label="Operation"
            min-width="150">
                <template slot-scope="scope">
                    <el-button v-if="tableData[scope.$index]['status'] == 0" type="primary" plain size="small"
                    @click="operateApi(tableData[scope.$index]['id'], 'enable')">Enable</el-button>
                    <el-button v-else type="warning" plain size="small"
                    @click="operateApi(tableData[scope.$index]['id'], 'disable')">Disable</el-button>
                    <el-button type="primary" plain size="small" @click="dialogEdit(tableData[scope.$index]['id'])">Edit</el-button>
                    <el-button type="danger" plain size="small" @click="deleteApi(tableData[scope.$index]['id'])">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="title" :visible.sync="dialogVisible">
            <el-form :model="formData">
                <el-form-item label="Url" :label-width="formLabelWidth">
                    <el-input v-model="formData.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Method" :label-width="formLabelWidth">
                    <el-select v-model="formData.method" placeholder="Select method">
                        <el-option label="GET" value="GET"></el-option>
                        <el-option label="POST" value="POST"></el-option>
                        <el-option label="PUT" value="PUT"></el-option>
                        <el-option label="PATCH" value="PATCH"></el-option>
                        <el-option label="DELETE" value="DELETE"></el-option>
                        <el-option label="HEAD" value="HEAD"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Weight" :label-width="formLabelWidth">
                    <el-input v-model="formData.weight" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Expect Status Code" :label-width="formLabelWidth">
                    <el-input v-model="formData.expect_status_code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Expect Str" :label-width="formLabelWidth">
                    <el-input v-model="formData.expect_str" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Request Data" :label-width="formLabelWidth">
                    <!-- <editor
                    v-model="formData.request_data"
                    style="font-size: 15px"
                    theme="chrome"
                    width="100%"
                    :options="{}"
                    ></editor> -->
                    <el-input v-model="formData.request_data" type="textarea" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addEditApi">确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    components: {
        // editor: require('vue2-ace-editor')
    },
    data() {
        return {
            title: 'Add API',
            editFlag: false,
            formLabelWidth: '140px',
            dialogVisible: false,
            editApiId: null,
            tableData: [],
            formData: {
                name: null,
                weight: 100,
                url: null,
                method: null,
                query_params: null,
                request_data: null,
                expect_status_code: null,
                expect_str: null
            }
        }
    },
    mounted(){
        // this.initEditor(null);
        this.apiList()
    },
    methods: {
        // initEditor(data){
        //     let container = document.getElementById('jsoneditor')
        //     let options = {
        //     mode: 'code',
        //     modes: ['code'],
        //     onError: function(err) {
        //         alert(err.toString());
        //         }
        //     }
        //     var codeEditor = new this.$jsoneditor(container, options)
        //     codeEditor.set(data)
        // },
        apiList(){
            this.$axios.get('/test/list').then(response =>{
                this.tableData = response.data.res
            })
        },
        initForm(){
            this.formData.name = '',
            this.formData.weight = 100,
            this.formData.url = '',
            this.formData.method = ''
            this.formData.query_params = '',
            this.formData.request_data = null,
            this.formData.expect_status_code = null,
            this.formData.expect_str = ''
        },
        cancel(){
            this.dialogVisible = false
            this.initForm()
        },
        dialogAdd(){
            this.title = 'Add API'
            this.editFlag = false
            this.dialogVisible = true
        },
        dialogEdit(id){
            this.title = 'Eidt API'
            this.editFlag = true
            this.dialogVisible = true
            this.editApiId = id
            this.$axios.get('/test/' + id).then(response => {
                this.formData = response.data.res
            })
        },
        addEditApi(){
            var data = {
                'weight': parseInt(this.formData.weight, 10),
                'url': this.formData.url,
                'method': this.formData.method,
                // 'query_params': this.formData.query_params,
                'request_data': this.formData.request_data,
                'expect_status_code': parseInt(this.formData.expect_status_code, 10),
                'expect_str': this.formData.expect_str
            }
            if (this.editFlag == false){
                this.$axios.post('/test', data).then(response =>{
                    if (this.messageShow(this, response)){
                        this.apiList()
                        this.initForm()
                        this.dialogVisible = false
                    }
                }).catch(error => {
                    this.errorMessageShow(this, error.response)
                })
            } else {
                this.$axios.put('/test/' + this.editApiId, data).then(response => {
                    if (this.messageShow(this, response)){
                        this.apiList()
                        this.initForm()
                        this.dialogVisible = false
                    }
                }).catch(error => {
                    this.errorMessageShow(this, error.response)
                })
            }
        },
        operateApi(id, operation){
            this.$axios.get('/test/' + id + '/' + operation).then(response => {
                if (this.messageShow(this, response)){
                    this.apiList()
                }
            }).catch(error => {
                this.errorMessageShow(this, error.response)
            })
        },
        deleteApi(id){
            this.$axios.delete('/test/' + id).then(response => {
                if (this.messageShow(this, response)){
                    this.apiList()
                }
            }).catch(error => {
                this.errorMessageShow(this, error.response)
            })
        }
    }
}
</script>