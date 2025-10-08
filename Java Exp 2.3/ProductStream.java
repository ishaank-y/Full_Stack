import java.util.*;
import java.util.stream.*;
class Product {
    int id;
    String name;
    double price;
    Product(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
public class ProductStream {
    public static void main(String[] args) {
        List<Product> list = Arrays.asList(
            new Product(1, "Pen", 10),
            new Product(2, "Notebook", 50),
            new Product(3, "Bag", 700),
            new Product(4, "Pencil", 5)
        );
        List<Product> expensive = list.stream()
            .filter(p -> p.price > 20)
            .collect(Collectors.toList());
        expensive.forEach(p -> System.out.println(p.name + " " + p.price));
        double total = list.stream().map(p -> p.price).reduce(0.0, Double::sum);
        System.out.println("Total Price: " + total);
    }
}
