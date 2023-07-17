package com.The_10th_Finance.property.mapper;

import com.The_10th_Finance.property.db.Property;
import com.The_10th_Finance.property.db.Property.PropertyBuilder;
import com.The_10th_Finance.property.model.PropertyPatch;
import com.The_10th_Finance.property.model.PropertyPost;
import com.The_10th_Finance.property.model.PropertyResponse;
import com.The_10th_Finance.property.model.PropertyResponse.PropertyResponseBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-12T13:57:27+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 17.0.5 (Amazon.com Inc.)"
)
@Component
public class PropertyMapperImpl implements PropertyMapper {

    @Override
    public Property propertyPostToProperty(PropertyPost propertyPost) {
        if ( propertyPost == null ) {
            return null;
        }

        PropertyBuilder property = Property.builder();

        property.title( propertyPost.getTitle() );
        property.content( propertyPost.getContent() );
        property.amount( propertyPost.getAmount() );
        property.propertyType( propertyPost.getPropertyType() );
        property.userId( propertyPost.getUserId() );

        return property.build();
    }

    @Override
    public PropertyResponse propertyToPropertyResponse(Property property) {
        if ( property == null ) {
            return null;
        }

        PropertyResponseBuilder propertyResponse = PropertyResponse.builder();

        propertyResponse.propertyId( property.getPropertyId() );
        propertyResponse.title( property.getTitle() );
        propertyResponse.content( property.getContent() );
        propertyResponse.amount( property.getAmount() );
        propertyResponse.propertyType( property.getPropertyType() );
        propertyResponse.userId( property.getUserId() );

        return propertyResponse.build();
    }

    @Override
    public void propertyPathDto(PropertyPatch propertyPatch, Property property) {
        if ( propertyPatch == null ) {
            return;
        }

        property.setTitle( propertyPatch.getTitle() );
        property.setContent( propertyPatch.getContent() );
        property.setAmount( propertyPatch.getAmount() );
        property.setPropertyType( propertyPatch.getPropertyType() );
    }
}
