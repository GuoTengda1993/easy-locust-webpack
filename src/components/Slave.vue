<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="4">
                <h2>Slave Nodes</h2>
            </el-col>
            <el-col :span="2" class="button-col">
                <el-button type="primary" plain size="small" @click="dialogAdd">Add</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="id"
            label="ID"
            width="50">
            </el-table-column>
            <el-table-column
            prop="ip"
            label="IP"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="username"
            label="Username">
            </el-table-column>
            <el-table-column
            prop="password"
            label="Password">
            </el-table-column>
            <el-table-column
            prop="extra"
            label="Extra">
            </el-table-column>
            <el-table-column
            label="Operation"
            min-width="150">
                <template slot-scope="scope">
                    <el-button v-if="tableData[scope.$index]['status'] == 0" type="primary" plain size="small"
                    @click="operateSlave(tableData[scope.$index]['id'], 'enable')">Enable</el-button>
                    <el-button v-else type="warning" plain size="small"
                    @click="operateSlave(tableData[scope.$index]['id'], 'disable')">Disable</el-button>
                    <el-button v-if="tableData[scope.$index]['status'] != 2" type="info" plain size="small"
                    @click="operateSlave(tableData[scope.$index]['id'], 'check')">Check</el-button>
                    <el-button type="primary" plain size="small" @click="dialogEdit(tableData[scope.$index]['id'])">Edit</el-button>
                    <el-button type="danger" plain size="small" @click="deleteSlave(tableData[scope.$index]['id'])">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-dialog :title="title" :visible.sync="dialogVisible">
            <el-form :model="formData">
                <el-form-item label="IP" :label-width="formLabelWidth">
                    <el-input v-model="formData.ip" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Username" :label-width="formLabelWidth">
                    <el-input v-model="formData.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" :label-width="formLabelWidth">
                    <el-input v-model="formData.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addEditSlave">确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'Add API',
            editFlag: false,
            formLabelWidth: '140px',
            dialogVisible: false,
            editSlaveId: null,
            tableData: [],
            formData: {
                ip: null,
                username: 'root',
                password: null
            }
        }
    },
    mounted(){
        this.slaveList()
    },
    methods: {
        slaveList(){
            this.$axios.get('/slave/list').then(response =>{
                this.tableData = response.data.res
            })
        },
        initForm(){
            this.formData.ip = '',
            this.formData.username = '',
            this.formData.password = ''
        },
        cancel(){
            this.dialogVisible = false
            this.initForm()
        },
        dialogAdd(){
            this.title = 'Add Slave Node'
            this.editFlag = false
            this.dialogVisible = true
        },
        dialogEdit(id){
            this.title = 'Eidt Slave Node'
            this.editFlag = true
            this.dialogVisible = true
            this.editSlaveId = id
            this.$axios.get('/slave/' + id).then(response => {
                this.formData = response.data.res
            })
        },
        addEditSlave(){
            var data = {
                'ip': this.formData.ip,
                'username': this.formData.username,
                'password': this.formData.password
            }
            if (this.editFlag == false){
                this.$axios.post('/slave', data).then(response =>{
                    if (this.messageShow(this, response)){
                        this.slaveList()
                        this.initForm()
                        this.dialogVisible = false
                    }
                }).catch(error => {
                    this.errorMessageShow(this, error.response)
                })
            } else {
                this.$axios.put('/slave/' + this.editSlaveId, data).then(response => {
                    if (this.messageShow(this, response)){
                        this.slaveList()
                        this.initForm()
                        this.dialogVisible = false
                    }
                }).catch(error => {
                    this.errorMessageShow(this, error.response)
                })
            }
        },
        operateSlave(id, operation){
            this.$axios.get('/slave/' + id + '/' + operation).then(response => {
                if (this.messageShow(this, response)){
                    this.slaveList()
                }
            }).catch(error => {
                this.errorMessageShow(this, error.response)
            })
        },
        deleteSlave(id){
            this.$axios.delete('/slave/' + id).then(response => {
                if (this.messageShow(this, response)){
                    this.slaveList()
                }
            }).catch(error => {
                this.errorMessageShow(this, error.response)
            })
        }

    }
}
</script>