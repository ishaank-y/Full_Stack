// File: UserDAO.java
package webapp;

import java.sql.*;
import java.util.*;

public class UserDAO {
    private Connection connect() throws SQLException {
        return DriverManager.getConnection("jdbc:mysql://localhost:3306/webdb", "root", "password");
    }

    public void insertUser(User user) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement("INSERT INTO users(name, email) VALUES(?, ?)")) {
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<User> getAllUsers() {
        List<User> list = new ArrayList<>();
        try (Connection conn = connect();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery("SELECT * FROM users")) {
            while (rs.next()) {
                list.add(new User(rs.getString("name"), rs.getString("email")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }
}