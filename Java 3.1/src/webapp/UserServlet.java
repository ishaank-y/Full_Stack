// File: UserServlet.java
package webapp;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;

public class UserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        User user = new User(name, email);
        new UserDAO().insertUser(user);
        response.sendRedirect("list.jsp");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<User> users = new UserDAO().getAllUsers();
        request.setAttribute("users", users);
        RequestDispatcher rd = request.getRequestDispatcher("list.jsp");
        rd.forward(request, response);
    }
}