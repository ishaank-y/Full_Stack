import java.util.*;
import java.util.stream.*;

public class LambdaStreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ishaank", "Amit", "Riya", "Deepak", "Anjali", "Rohan");

        List<String> sortedNames = names.stream()
                .sorted()
                .collect(Collectors.toList());

        System.out.println("Sorted Names: " + sortedNames);

        List<String> filteredNames = names.stream()
                .filter(name -> name.startsWith("A"))
                .collect(Collectors.toList());

        System.out.println("Names starting with A: " + filteredNames);

        List<Integer> numbers = Arrays.asList(10, 25, 30, 45, 50, 60, 75);

        List<Integer> processedNumbers = numbers.stream()
                .filter(n -> n % 2 == 0)
                .map(n -> n * 2)
                .sorted()
                .collect(Collectors.toList());

        System.out.println("Processed Numbers: " + processedNumbers);

        double average = numbers.stream()
                .mapToInt(n -> n)
                .average()
                .orElse(0);

        System.out.println("Average of numbers: " + average);
    }
}