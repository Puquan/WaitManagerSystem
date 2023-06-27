package com.comp9900.waitsys;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@MapperScan({"com.comp9900.waitsys.manager.mapper", "com.comp9900.waitsys.customer.mapper", "com.comp9900.waitsys.waitStaff.mapper", "com.comp9900.waitsys.kitchenStaff.mapper"})
public class WaitSysApplication {

    public static void main(String[] args) {

        SpringApplication.run(WaitSysApplication.class, args);
    }

    // example for controller (@Controller + @RequestMapping(url) + @ResponseBody) or (@RestController + @GetMapping)
//    @RequestMapping("/")
//    @ResponseBody
//    public String hello() {
//        return "Hello World!";
//    }

}
