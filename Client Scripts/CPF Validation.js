function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }



    var pattern = /^\\d{3}.\d{3}.\d{3}-\d{2}$/; //xxx.xxx.xxx-xx
    var cpf = g_form.getValue('u_cpf');
    if (!pattern.test(cpf)) {
        cpf = cpf.replace(/\D/g, '');
        var regex = /^\d{11}$/;
        var is_valid = regex.test(cpf);
        if (!is_valid) {
            g_form.addInfoMessage('CPF inválido. Favor inserir 11 números.');
            g_form.clearValue('u_cpf');
        } else {
            cpf = cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9, 11);
            g_form.setValue('u_cpf', cpf);
        }
    }
}
