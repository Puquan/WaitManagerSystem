package com.comp9900.waitsys.customer.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.comp9900.waitsys.constant.Constant;
import com.comp9900.waitsys.customer.entity.Table;
import com.comp9900.waitsys.customer.mapper.TableMapper;
import com.comp9900.waitsys.customer.service.TableService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TableServiceImpl extends ServiceImpl<TableMapper, Table> implements TableService {


    @Override
    public List<Integer> showAllAvailable() {
        LambdaQueryWrapper<Table> lqw = new LambdaQueryWrapper<>();
        lqw.select(Table::getTableId).eq(Table::getState, Constant.TABLE_STATE_EMPTY);
        List<Object> tableIds = listObjs(lqw);
        // convert list of Object to list of Integer
        List<Integer> tableIdList = tableIds.stream()
                .filter(obj -> obj instanceof Integer)
                .map(obj -> (Integer) obj)
                .collect(Collectors.toList());
        return tableIdList;
    }

    @Override
    public boolean addNewTable() {
        Table table = new Table();
        table.setState(Constant.TABLE_STATE_EMPTY);
        table.setNeedHelp(Constant.TABLE_NEEDHELP_NO_NEED_HELP);
        return save(table);
    }

    @Override
    public boolean activateTable(Integer tableId) {
        Table table = getById(tableId);
        table.setState(Constant.TABLE_STATE_ACTIVE);
        return updateById(table);
    }

    @Override
    public boolean freeTable(Integer tableId) {
        Table table = getById(tableId);
        table.setState(Constant.TABLE_STATE_EMPTY);
        return updateById(table);
    }

    @Override
    public boolean toPayTable(Integer tableId) {
        Table table = getById(tableId);
        table.setState(Constant.TABLE_STATE_TO_PAY);
        return updateById(table);
    }

    @Override
    public boolean askForHelp(Integer tableId) {
        Table table = getById(tableId);
        table.setNeedHelp(Constant.TABLE_NEEDHELP_NEED_HELP);
        return updateById(table);
    }
}
