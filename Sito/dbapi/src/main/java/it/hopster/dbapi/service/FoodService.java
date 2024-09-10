package it.hopster.dbapi.service;

import it.hopster.dbapi.model.Food;
import it.hopster.dbapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public List<Food> getAllFoodsOrderByProduct() {
        return foodRepository.findByOrderByProduct();
    }

    public List<Food> getAllFoodsOrderByQuantity() {
        return foodRepository.findByOrderByQuantity();
    }

    public List<Food> getAllFoodsOrderByDeliveryDate() {
        return foodRepository.findByOrderByDeliveryDate();
    }

    public List<Food> getAllFoodsOrderByExpirationDate() {
        return foodRepository.findByOrderByExpirationDate();
    }

    public List<Food> getAllFoodsOrderByFreezingDate() {
        return foodRepository.findByOrderByFreezingDate();
    }

    public Food getFoodById(Long id) {
        return foodRepository.findById(id).orElse(null);
    }


    public Food createFood(String product, int quantity,
                           LocalDate deliveryDate, LocalDate expirationDate, Boolean isFrozen,
                           LocalDate freezingDate) {
        Food newFood = new Food(
                null, product, quantity, deliveryDate, expirationDate, isFrozen, freezingDate
        );
        return foodRepository.save(newFood);
    }

    public Food createFood(Food newFood) {
        return foodRepository.save(newFood);
    }

    public Food updateFood(String product, int quantity,
                           LocalDate deliveryDate, LocalDate expirationDate, Boolean isFrozen,
                           LocalDate freezingDate) {
        Food food = new Food(
                null, product, quantity, deliveryDate, expirationDate, isFrozen, freezingDate
        );
        return foodRepository.save(food);
    }

    public Food updateFood(Food updatedFood) {
        return foodRepository.save(updatedFood);
    }

    public boolean deleteFood(Long id) {
        Food food = foodRepository.findById(id).orElse(null);
        if (food != null) {
            foodRepository.deleteById(id);
            return true;
        }
        return false;
    }


}