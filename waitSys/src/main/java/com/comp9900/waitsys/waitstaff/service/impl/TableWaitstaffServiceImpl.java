package com.comp9900.waitsys.waitstaff.service.impl;

import com.comp9900.waitsys.customer.entity.Order;
import com.comp9900.waitsys.customer.entity.OrderItem;
import com.comp9900.waitsys.customer.entity.Table;
import com.comp9900.waitsys.customer.mapper.OrderItemMapper;
import com.comp9900.waitsys.customer.mapper.OrderMapper;
import com.comp9900.waitsys.customer.mapper.TableMapper;
import com.comp9900.waitsys.kitchen.entity.OrderDTO;
import com.comp9900.waitsys.kitchen.entity.OrderItemKitchenVO;
import com.comp9900.waitsys.kitchen.entity.OrderKitchenVO;
import com.comp9900.waitsys.manager.entity.Item;
import com.comp9900.waitsys.waitstaff.entity.DTO.TableDTO;
import com.comp9900.waitsys.waitstaff.entity.VO.OrderItemWaitstaffVO;
import com.comp9900.waitsys.waitstaff.entity.VO.TableWaitstaffVO;
import com.comp9900.waitsys.waitstaff.service.OrderItemWaitstaffService;
import com.comp9900.waitsys.waitstaff.service.TableWaitstaffService;
import com.github.yulichang.base.MPJBaseServiceImpl;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.comp9900.waitsys.constant.Constant.*;

/**
 * @author Weizhe Pan
 * @date 2023/7/14
 */
@Service
public class TableWaitstaffServiceImpl extends MPJBaseServiceImpl<TableMapper, Table> implements TableWaitstaffService {

    @Autowired
    private OrderItemMapper orderItemMapper;

    @Autowired
    private TableMapper tableMapper;



    @Override
    public List<TableWaitstaffVO> listAllTablesWaitstaff() {
        List<TableWaitstaffVO> tableWaitstaffVOList=new ArrayList<>();
        MPJLambdaWrapper<Table> myWrapper = new MPJLambdaWrapper<>();
        myWrapper
                .eq(Table::getState,TABLE_STATE_ACTIVE)
                .or()
                .eq(Table::getState,TABLE_STATE_TO_PAY)
                .selectAs(Table::getTableId,"tableId")
                .selectAs(Table::getState,"state")
                .selectAs(Table::getNeedHelp,"needHelp");
        List<TableDTO> tableDTOList=tableMapper.selectJoinList(TableDTO.class,myWrapper);
        for (TableDTO tableDTO:tableDTOList)
        {
            TableWaitstaffVO tableWaitstaffVO=new TableWaitstaffVO();
            tableWaitstaffVO.setTableId(tableDTO.getTableId());
            tableWaitstaffVO.setNeedHelp(tableDTO.getNeedHelp());
            tableWaitstaffVO.setState(tableDTO.getState());
            MPJLambdaWrapper<OrderItem> myWrapper2 = new MPJLambdaWrapper<>();
            myWrapper2
                    .leftJoin(Item.class,Item::getItemId,OrderItem::getItemId)
                    .leftJoin(Table.class,Table::getTableId,OrderItem::getTableId)
                    .eq(Table::getTableId,tableDTO.getTableId())
                    .eq(OrderItem::getIsServe,ORDERITEM_ISSERVE_FALSE)
                    .selectAs(OrderItem::getId,"id")
                    .selectAs(Item::getName,"itemName")
                    .selectAs(OrderItem::getIsCook,"isCook")
                    .selectAs(OrderItem::getIsServe,"isServe");
            List<OrderItemWaitstaffVO> orderItemWaitstaffVOList=orderItemMapper.selectJoinList(OrderItemWaitstaffVO.class,myWrapper2);
            tableWaitstaffVO.setOrderItemList(orderItemWaitstaffVOList);
            tableWaitstaffVOList.add(tableWaitstaffVO);

        }
        return tableWaitstaffVOList;
    }
    @Override
    public boolean confirmRequestBill(Integer tableId) {
        Table table=this.getById(tableId);
        table.setState(TABLE_STATE_EMPTY);
        return updateById(table);
    }

    @Override
    public boolean markNeedHelp(Integer tableId) {
        Table table=this.getById(tableId);
        table.setNeedHelp(TABLE_NEEDHELP_NO_NEED_HELP);
        return updateById(table);
    }


}
