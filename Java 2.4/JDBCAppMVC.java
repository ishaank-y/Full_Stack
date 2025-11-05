import java.sql.*;
import java.util.*;

class Student {
    int id;
    String name;
    int age;

    public Student(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}

class StudentDAO {
    private Connection connect() throws SQLException {
        return DriverManager.getConnection("jdbc:mysql://localhost:3306/college", "root", "password");
    }

    public void insertStudent(Student s) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement("INSERT INTO students VALUES (?, ?, ?)")) {
            ps.setInt(1, s.id);
            ps.setString(2, s.name);
            ps.setInt(3, s.age);
            ps.executeUpdate();
            System.out.println("Student added successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateStudent(int id, String newName, int newAge) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement("UPDATE students SET name=?, age=? WHERE id=?")) {
            ps.setString(1, newName);
            ps.setInt(2, newAge);
            ps.setInt(3, id);
            ps.executeUpdate();
            System.out.println("Student updated successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteStudent(int id) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement("DELETE FROM students WHERE id=?")) {
            ps.setInt(1, id);
            ps.executeUpdate();
            System.out.println("Student deleted successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void viewStudents() {
        try (Connection conn = connect();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery("SELECT * FROM students")) {
            while (rs.next()) {
                System.out.println(rs.getInt("id") + " " + rs.getString("name") + " " + rs.getInt("age"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

public class JDBCAppMVC {
    public static void main(String[] args) {
        StudentDAO dao = new StudentDAO();
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("1. Add 2. Update 3. Delete 4. View 5. Exit");
            int choice = sc.nextInt();
            if (choice == 1) {
                System.out.print("Enter id name age: ");
                dao.insertStudent(new Student(sc.nextInt(), sc.next(), sc.nextInt()));
            } else if (choice == 2) {
                System.out.print("Enter id newName newAge: ");
                dao.updateStudent(sc.nextInt(), sc.next(), sc.nextInt());
            } else if (choice == 3) {
                System.out.print("Enter id to delete: ");
                dao.deleteStudent(sc.nextInt());
            } else if (choice == 4) {
                dao.viewStudents();
            } else {
                break;
            }
        }
    }
}