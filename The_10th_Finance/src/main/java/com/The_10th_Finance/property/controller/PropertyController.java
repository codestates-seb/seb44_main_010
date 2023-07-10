package com.The_10th_Finance.property.controller;

import com.The_10th_Finance.property.db.Property;
import com.The_10th_Finance.property.mapper.PropertyMapper;
import com.The_10th_Finance.property.model.PropertyPatch;
import com.The_10th_Finance.property.model.PropertyPost;
import com.The_10th_Finance.property.service.PropertyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RestController
@RequestMapping("/property")
@RequiredArgsConstructor
public class PropertyController {
    private final PropertyMapper propertyMapper;
    private final PropertyService propertyService;

    @PostMapping("/post")
    public ResponseEntity postTodo(@Valid @RequestBody PropertyPost propertyPost){
        Property property =propertyService.post(propertyMapper.propertyPostToProperty(propertyPost));
        return  new ResponseEntity(propertyMapper.propertyToPropertyResponse(property), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity getCar(@PathVariable(name = "id") @Positive Long id){
        Property property = propertyService.getOne(id);
        return new ResponseEntity(propertyMapper.propertyToPropertyResponse(property),HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable(name = "id") @Positive Long id){
        propertyService.deleteOne(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchTodo(@PathVariable(name = "id") @Positive Long id,
                                   @Valid @RequestBody PropertyPatch propertyPatch) {
        Property userCash = propertyService.getOne(id);
        propertyMapper.propertyPathDto(propertyPatch,userCash);
        return new ResponseEntity(propertyMapper.propertyToPropertyResponse(propertyService.post(userCash)),HttpStatus.ACCEPTED);
    }

}
