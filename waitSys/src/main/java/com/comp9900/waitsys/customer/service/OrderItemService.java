package com.comp9900.waitsys.customer.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.comp9900.waitsys.customer.entity.OrderItem;
import com.comp9900.waitsys.customer.entity.OrderItemVO;

import java.util.List;

/**
 * @author Wei Chen
 * Date:2023-07-11 17:29
 * Description: the service of orderItem
 */

public interface OrderItemService extends IService<OrderItem> {

    /**
     * add new item to the current order
     * @param orderId order id
     * @param itemId item id
     * @param tableId table id
     * @return true or false
     */
    boolean addNewOrderItem(Integer orderId, Integer itemId, Integer tableId);

    /**
     * delete all orderItems by order id when customer check the bill
     * @param orderId order id
     * @return true or false
     */
    boolean deleteOrderItemsByOrder(Integer orderId);

    /**
     * show all items information from the order
     * @param orderId order id
     * @return list of orderItemVO
     */
    List<OrderItemVO> showAllItemsByOrder(Integer orderId);

    /**
     * show all items information from the previous orders
     * @param tableId table id
     * @return list of orderItemVO
     */
    List<OrderItemVO> showAllPreviousItems(Integer tableId);

    /**
     * remove an item from the order
     * @param orderId order id
     * @param itemId item id
     * @param tableId table id
     * @return true or false
     */
    boolean removeOrderItem(Integer orderId, Integer itemId, Integer tableId);
}
