import java.util.*;
class Employee {
    int id;
    String name;
    double salary;
    Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
}
public class EmployeeSort {
    public static void main(String[] args) {
        List<Employee> list = new ArrayList<>();
        list.add(new Employee(101, "Rahul", 50000));
        list.add(new Employee(102, "Aman", 45000));
        list.add(new Employee(103, "Neha", 60000));
        list.sort((e1, e2) -> e1.name.compareTo(e2.name));
        list.forEach(e -> System.out.println(e.id + " " + e.name + " " + e.salary));
    }
}
