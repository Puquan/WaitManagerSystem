package com.comp9900.waitsys.waitstaff.service.impl;

import com.comp9900.waitsys.customer.entity.OrderItem;
import com.comp9900.waitsys.customer.mapper.OrderItemMapper;
import com.comp9900.waitsys.kitchen.service.KitchenOrderItemService;
import com.comp9900.waitsys.waitstaff.service.OrderItemWaitstaffService;
import com.github.yulichang.base.MPJBaseServiceImpl;
import org.springframework.stereotype.Service;

import static com.comp9900.waitsys.constant.Constant.ORDERITEM_ISSERVE_TRUE;

/**
 * @author Weizhe Pan
 * @date 2023/7/14
 */
@Service
public class OrderItemWaitstaffServiceImpl  extends MPJBaseServiceImpl<OrderItemMapper, OrderItem> implements OrderItemWaitstaffService {

    @Override
    public boolean modifyIsServe(Integer orderItemId) {
        OrderItem orderItem=this.getById(orderItemId);
        orderItem.setIsServe(ORDERITEM_ISSERVE_TRUE);
        return updateById(orderItem);
    }
}
