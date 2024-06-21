import React from "react";
import { useFetchAllCreativesByDataQuery } from "@/store/wordpress/wpRestApi";
import CreativesListItem from "../CreativesListItem";
import { CreativeDataType } from "@/types/components/Creative";

const CreativesList = () => {

    const { data: creatives = [], isLoading, isError, error } = useFetchAllCreativesByDataQuery({ per_page: 10, offset: 0 });

    const renderListItems = () => {
        return Boolean(creatives.length) && creatives.map((creative: CreativeDataType) => (
            <CreativesListItem key={creative.id} creative={creative} hasLiked={false} />
        ))
    }

    return (
        <div className="container container_creatives">
            <div className="creatives-list-grid">
                {renderListItems()}
            </div>
        </div>
    )
}

export default CreativesList;