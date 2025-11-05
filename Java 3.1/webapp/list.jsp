<!-- File: list.jsp -->
<html>
<body>
<h2>Registered Users</h2>
<table border="1">
<tr><th>Name</th><th>Email</th></tr>
<%
    java.util.List<webapp.User> users = (java.util.List<webapp.User>) request.getAttribute("users");
    if (users != null) {
        for (webapp.User u : users) {
%>
<tr><td><%= u.getName() %></td><td><%= u.getEmail() %></td></tr>
<%
        }
    }
%>
</table>
<a href="index.jsp">Add More Users</a>
</body>
</html>