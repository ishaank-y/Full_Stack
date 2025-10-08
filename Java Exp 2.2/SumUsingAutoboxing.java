import java.util.*;

public class SumUsingAutoboxing {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<Integer> numbers = new ArrayList<>();
        System.out.print("Enter integers separated by spaces: ");
        String input = sc.nextLine();
        String[] parts = input.split(" ");
        for (String s : parts) {
            int num = Integer.parseInt(s);
            numbers.add(num);
        }
        int sum = 0;
        for (Integer i : numbers) {
            sum += i;
        }
        System.out.println("Sum of all integers = " + sum);
        sc.close();
    }
}
