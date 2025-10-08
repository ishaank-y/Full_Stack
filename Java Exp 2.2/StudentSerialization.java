import java.io.*;

class Student implements Serializable {
    private int studentID;
    private String name;
    private double grade;

    public Student(int studentID, String name, double grade) {
        this.studentID = studentID;
        this.name = name;
        this.grade = grade;
    }

    public void display() {
        System.out.println("ID: " + studentID + ", Name: " + name + ", Grade: " + grade);
    }
}

public class StudentSerialization {
    public static void main(String[] args) {
        Student s1 = new Student(101, "Divyansh", 9.5);
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("student.ser"))) {
            out.writeObject(s1);
            System.out.println("Student object serialized successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("student.ser"))) {
            Student s2 = (Student) in.readObject();
            System.out.println("Student object deserialized successfully!");
            s2.display();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
