const fs = require("fs")
const data = require("../data.json")
const {age, graduation, date} = require("../utils.js")
const Intl = require("intl")

exports.index = function(req, res){    
    return res.render("teachers/index", { teachers: data.teachers })
}

exports.create = function(req, res){
    return res.render("teachers/create")
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "")
            return res.send(`Required field: ${key}`)       
    }

    let {avatar_url, birth, name, graduation, class_type, classes} = req.body

    classes = classes.split(",")
    birth = Date.parse(birth)
    const created = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id, 
        avatar_url, 
        birth, 
        name, 
        graduation, 
        class_type, 
        classes, 
        created
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Error writing file")

        return res.redirect(`/teachers`)
    })

}

exports.show = function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send("Teacher not found")    

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.graduation),        
        created: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created)
    }

    return res.render("teachers/show", { teacher })
}

exports.edit = function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send("Teacher not found") 

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso,
        id: Number(foundTeacher.id)        
    }

    return res.render("teachers/edit", {teacher})
}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (teacher.id == id) {
           index = foundIndex 
           return true
        }
    })
    if (!foundTeacher) return res.send("Teacher not found") 

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
        classes: req.body.classes.split(",")
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error")

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Error writing file")
        return res.redirect("/teachers")
    })
}