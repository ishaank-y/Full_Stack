package com.example.springhib.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.example.springhib.model.Student;
import com.example.springhib.repo.StudentRepository;

@Service
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Student create(Student s) {
        return repository.save(s);
    }

    public List<Student> all() {
        return repository.findAll();
    }

    public Student get(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Student update(Long id, Student data) {
        Student s = repository.findById(id).orElse(null);
        if (s == null) return null;
        s.setName(data.getName());
        s.setAge(data.getAge());
        return repository.save(s);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}