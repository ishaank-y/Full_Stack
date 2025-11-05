package com.example.springhib.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.springhib.model.Student;
import com.example.springhib.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping
    public Student create(@RequestBody Student s) {
        return service.create(s);
    }

    @GetMapping
    public List<Student> all() {
        return service.all();
    }

    @GetMapping("/{id}")
    public Student get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student s) {
        return service.update(id, s);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}