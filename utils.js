module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        if (month < 0 || month == 0 && birthDate.getDate() > today.getDate ) {
            age -= 1
        }    
        return age
    },
    graduation: function(key) {
        const grades = {
            high: "Ensino Médio",
            college: "Superior",
            master: "Mestrado",
            doctor: "Doutorado"
        }
        let graduation = grades[key]        
        return graduation
    },
    date: function(timestamp) {

        const date = new Date(timestamp)
        
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            year,
            month,
            day,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    grade: function(key) {
        const grades = {
            F5: "5º ano do Ensino Fundamental",
            F6: "6º ano do Ensino Fundamental",
            F7: "7º ano do Ensino Fundamental",
            F8: "8º ano do Ensino Fundamental",
            F9: "9º ano do Ensino Fundamental",
            M1: "1º ano do Ensino Médio",
            M2: "2º ano do Ensino Médio",
            M3: "3º ano do Ensino Médio"
        }
        let grade = grades[key]        
        return grade
    }
}