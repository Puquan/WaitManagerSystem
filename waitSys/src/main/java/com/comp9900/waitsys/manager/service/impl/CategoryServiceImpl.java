package com.comp9900.waitsys.manager.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.comp9900.waitsys.manager.entity.Category;
import com.comp9900.waitsys.manager.entity.Item;
import com.comp9900.waitsys.manager.entity.VO.CategoryVO;
import com.comp9900.waitsys.manager.mapper.CategoryMapper;
import com.comp9900.waitsys.manager.service.CategoryService;
import com.github.yulichang.base.MPJBaseServiceImpl;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @author Weizhe Pan
 * @date 2023/6/27
 * @description the category service implementation of manager
 */
public class CategoryServiceImpl extends MPJBaseServiceImpl<CategoryMapper, Category> implements CategoryService {
    @Autowired
    private CategoryMapper categoryMapper;


    @Override
    public List<CategoryVO> listAllCategories() {
        MPJLambdaWrapper<Category> myWrapper = new MPJLambdaWrapper<>();
        myWrapper
                .eq(Category::getIsOnMenu,1)
                .selectAs(Category::getCategoryId,"id")
                .selectAs(Category::getName,"name");

        return categoryMapper.selectJoinList(CategoryVO.class,myWrapper);
    }

    @Override
    public boolean addCategory(String categoryName) {
        Category category=new Category();
        category.setName(categoryName);
        category.setIsOnMenu(1);
        category.setOrder(category.getCategoryId());
        return this.save(category);
    }

    @Override
    public boolean removeCategory(Integer categoryId) {
        Category category=this.getById(categoryId);
        category.setIsOnMenu(0);
        return updateById(category);
    }

    @Override
    public boolean changeCategoryOrder(List<Integer> categoryIdList, List<Integer> orderNumList) {
        int count = 0;
        for (int i = 0; i < categoryIdList.size(); i++) {
            Category category = getById(categoryIdList.get(i));
            category.setOrder(orderNumList.get(i));
            if (updateById(category)) {
                count++;
            }
        }
        return count == categoryIdList.size();
    }


}