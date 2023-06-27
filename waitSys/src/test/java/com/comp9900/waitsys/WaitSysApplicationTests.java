package com.comp9900.waitsys;

import com.comp9900.waitsys.manager.entity.Item;
import com.comp9900.waitsys.manager.mapper.ItemMapper;
import com.comp9900.waitsys.manager.service.CategoryService;
import com.comp9900.waitsys.manager.service.ItemService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class WaitSysApplicationTests {

    @Autowired
    private ItemMapper itemMapper;

    @Autowired
    private ItemService itemService;
    private CategoryService categoryService;

    @Test
    public void testSelect() {
        System.out.println(("----- selectAll method test ------"));
        List<Item> itemList = itemMapper.selectList(null);
        System.out.println(itemList.get(1));
    }

    @Test
    public void testAddNewItem(){
        boolean flag = itemService.addNewItem("hotpot", null, null, null, 20.8f, 2);
        System.out.println("The flag = " + flag);
    }

    @Test
    public void testAddNewCategory(){
        boolean flag = categoryService.addCategory("drinks");
        System.out.println("The flag = " + flag);
    }
}
