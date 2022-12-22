class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector(".formulario");
        this.eventos();
    }

    eventos () {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.checkFields();
        const validPasswords = this.checkPasswords();

        if(validFields && validPasswords) {
            this.formulario.submit();
            alert('Formulário Enviado com sucesso!');
            
        }

        
    }


    checkPasswords() {
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha ');

        if(senha.value !== repetirSenha.value) {
            valid = false;
            this.createError(senha, 'Campos senha e repetir senha não são iguais');
            this.createError(repetirSenha, 'Campos senha e repetir senha não são iguais');
        };

        if(senha.value.length < 6 || senha.value.length > 12) {
            this.createError(senha, 'Senha precisa ter entre 6 e 12 caracteres');
            valid = false;
        };

        return valid;
    }

    checkFields() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let field of this.formulario.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText;
            if(!field.value) {
                this.createError(field, `"${label}" não pode estar em branco`);
                valid = false;
            }

            if(field.classList.contains('cpf')) {
                if(!this.validaCpf(field)) valid = false;
            }

            if(field.classList.contains('usuario')) {
                if(!this.validaUsuario(field)) valid = false;
            }
        }
        
        return valid;
    }

    validaUsuario(field) {
        const usuario = field.value;
        let valid = true;
        if(usuario.length < 3 || usuario.length > 12) {
            this.createError(field, 'Usuário deverá ter entre 3 e 12 caracteres');
            valid = false;
        };

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Usuário só pode conter letras e/ou números');
            valid = false;
        };

        return valid;
         
    }

    validaCpf(field) {
        const cpf = new ValidaCpf(field.value);

        if(!cpf.valida()) {
            this.createError(field, 'CPF inválido.');
            return false;
        }

        return true;
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
       
    }

}


const valida = new ValidaFormulario();
