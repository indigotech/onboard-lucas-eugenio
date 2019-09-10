export function validateEmail(email: string): string {
    if (!email) {
        return 'Por favor, insira um e-mail'
    } else if (!/\w+@\w+\.com$/.test(email)) {
        return 'Por favor, insira um e-mail válido'
    } else {
        return ''
    }
}

export function validatePassword(password: string): string {
    if (!password) {
        return 'Por favor, insira uma senha'
    } else if (password.length < 7) {
        return 'A senha deve ter ao menos 7 dígitos'
    } else {
        return ''
    }
}

export function validateCpf(cpf: string): string {
    if (!cpf) {
        return 'Por favor, insira o CPF'
    } else if (cpf.length != 11) {
        return 'Por favor, insira um CPF válido'
    } else {
        return ''
    }
}

export function validateBirthDate(date: string): string {
    if (!date) {
        return 'Por favor, insira uma data'
    } else if (/\A\d{4}-\d{2}-\d{2}\z/.test(date)) {
        return 'Por favor, insira uma data no formato YYYY-MM-DD'
    } else {
        return ''
    }
}

export function validateName(name: string): string {
    if (!name) {
        return 'Por favor, insira um nome'
    } else {
        return ''
    }
}