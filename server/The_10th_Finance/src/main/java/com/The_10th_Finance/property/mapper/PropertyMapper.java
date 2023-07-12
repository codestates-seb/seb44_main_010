package com.The_10th_Finance.property.mapper;

import com.The_10th_Finance.property.db.Property;
import com.The_10th_Finance.property.model.PropertyPatch;
import com.The_10th_Finance.property.model.PropertyPost;
import com.The_10th_Finance.property.model.PropertyResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    Property propertyPostToProperty(PropertyPost propertyPost);
    PropertyResponse propertyToPropertyResponse(Property property);
    void propertyPathDto(PropertyPatch propertyPatch, @MappingTarget Property property);
}
