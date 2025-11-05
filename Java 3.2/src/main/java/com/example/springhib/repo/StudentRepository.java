package com.example.springhib.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springhib.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}