exports.install = function(Vue) {
    Vue.prototype.messageShow = function(_this, response) {
        if (response.data['code'] < 210) {
            if (response.data['msg'] != ''){
                _this.$notify({
                    title: 'Success',
                    message: response.data['msg'],
                    type: 'success'
                })
            }
        } else {
            _this.$notify({
                title: 'Warning',
                message: response.data['msg'],
                type: 'warning'
            })
        }
        return true
    },
    Vue.prototype.errorMessageShow = function(_this, response) {
        _this.$notify.error({
            title: 'Error',
            message: response.data['msg']
        })
    }
}