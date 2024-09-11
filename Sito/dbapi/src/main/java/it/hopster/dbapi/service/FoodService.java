package it.hopster.dbapi.service;

import it.hopster.dbapi.exception.FoodNotFoundException;
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

    public List<Food> getAllFoods(String orderBy, String orderByDesc) {
        if (orderBy == null && orderByDesc == null) {
            return foodRepository.findAll();
        }
        if (orderBy != null && !orderBy.isEmpty()) {
            return orderBy(orderBy);
        }
        if (orderByDesc != null && !orderByDesc.isEmpty())
            return orderByDesc(orderByDesc);

        return foodRepository.findAll();
    }

    private List<Food> orderBy(String orderBy) {
        if (orderBy.equals("product")) {
            return foodRepository.findByOrderByProduct();
        }
        if (orderBy.equals("quantity")) {
            return foodRepository.findByOrderByQuantity();
        }
        if (orderBy.equals("deliveryDate")) {
            return foodRepository.findByOrderByDeliveryDate();
        }
        if (orderBy.equals("expirationDate")) {
            return foodRepository.findByOrderByExpirationDate();
        }
        if (orderBy.equals("freezingDate")) {
            return foodRepository.findByOrderByFreezingDate();
        }
        return foodRepository.findAll();
    }

    private List<Food> orderByDesc(String orderBy) {
        if (orderBy.equals("product")) {
            return foodRepository.findByOrderByProductDesc();
        }
        if (orderBy.equals("quantity")) {
            return foodRepository.findByOrderByQuantityDesc();
        }
        if (orderBy.equals("deliveryDate")) {
            return foodRepository.findByOrderByDeliveryDateDesc();
        }
        if (orderBy.equals("expirationDate")) {
            return foodRepository.findByOrderByExpirationDateDesc();
        }
        if (orderBy.equals("freezingDate")) {
            return foodRepository.findByOrderByFreezingDateDesc();
        }
        return foodRepository.findAll();
    }

    public Food getFoodById(Long id) {
        return foodRepository.findById(id).orElse(null);
    }

    public Food createFood(Food newFood) {
        return foodRepository.save(newFood);
    }

    public Food updateFood(Long id, Food updatedFood) {
        Food food = foodRepository.findById(id).orElseThrow(() -> new FoodNotFoundException("Alimento non trovato"));
        if (!food.getId().equals(updatedFood.getId())) {
            throw new FoodNotFoundException("ID alimenti discordanti");
        }
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