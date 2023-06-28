package com.comp9900.waitsys.manager.entity;

/**
 * @author Wei Chen
 * Date:2023-06-25 23:00
 * Description: the entity of dish item and category
 */
public class ItemVO extends Item{
    private String category;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public ItemVO() {

    }

    public ItemVO(Integer itemId, String name, byte[] picture, String description, String ingredient, Float price, Integer categoryId, Float rating, Integer isOnMenu, Integer orderNum, String category) {
        super(itemId, name, picture, description, ingredient, price, categoryId, rating, isOnMenu, orderNum);
        this.category = category;
    }

    @Override
    public String toString() {
        return "ItemVO{" +
                "category='" + category + '\'' +
                '}';
    }
}
