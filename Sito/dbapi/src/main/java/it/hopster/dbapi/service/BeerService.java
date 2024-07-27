package it.hopster.dbapi.service;

import it.hopster.dbapi.model.Beer;

import it.hopster.dbapi.repository.BeerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BeerService {

    @Autowired
    private BeerRepository beerRepository;

    public List<Beer> getAllBeers() {
        return beerRepository.findAll();
    }

    public Beer getBeerById(Long id) {
        return beerRepository.findById(id).orElse(null);
    }

    public Beer createBeer(String brewery, String beerName,
                           String beerStyle, String barrelTypeAndTap,
                           Date fullBarrelDate, Date emptyBarrelDate) {
        Beer newBeer = new Beer(
                null, brewery, beerName, beerStyle, barrelTypeAndTap, fullBarrelDate, emptyBarrelDate
        );
        return beerRepository.save(newBeer);
    }

    public Beer updateBeer(String brewery, String beerName,
                           String beerStyle, String barrelTypeAndTap,
                           Date fullBarrelDate, Date emptyBarrelDate) {
        Beer beer = new Beer(
                null, brewery, beerName, beerStyle, barrelTypeAndTap, fullBarrelDate, emptyBarrelDate
        );
        return beerRepository.save(beer);
    }

    public boolean deleteBeer(Long id) {
        Beer beer = beerRepository.findById(id).orElse(null);
        if (beer != null) {
            beerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}