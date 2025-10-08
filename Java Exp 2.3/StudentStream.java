import java.util.*;
import java.util.stream.*;
class Student {
    String name;
    int marks;
    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}
public class StudentStream {
    public static void main(String[] args) {
        List<Student> list = Arrays.asList(
            new Student("Aarav", 80),
            new Student("Riya", 65),
            new Student("Karan", 90),
            new Student("Tina", 50)
        );
        list.stream()
            .filter(s -> s.marks >= 60)
            .sorted((s1, s2) -> s2.marks - s1.marks)
            .forEach(s -> System.out.println(s.name + " " + s.marks));
    }
}
