package it.hopster.dbapi.service;

import it.hopster.dbapi.model.Food;
import it.hopster.dbapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food getFoodById(Long id) {
        return foodRepository.findById(id).orElse(null);
    }

    public Food createFood(String product, int quantity,
                           Date deliveryDate, Date expirationDate, boolean isFrozen,
                           Date freezingDate) {
        Food newFood = new Food(
                null, product, quantity, deliveryDate, expirationDate, isFrozen, freezingDate
        );
        return foodRepository.save(newFood);
    }

    public Food updateFood(String product, int quantity,
                           Date deliveryDate, Date expirationDate, boolean isFrozen,
                           Date freezingDate) {
        Food food = new Food(
                null, product, quantity, deliveryDate, expirationDate, isFrozen, freezingDate
        );
        return foodRepository.save(food);
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