import React from "react";
import { useFetchAllCreativesQuery } from "@/store/wordpress/wpRestApi";
import CreativesListItem from "../CreativesListItem";
import { CreativeDataType } from "@/types/components/Creative";

const CreativesList = () => {

    const { data: creatives = [], isLoading, isError, error } = useFetchAllCreativesQuery({ per_page: 5 });

    return (
        <div className="container container_creatives">
            <div className="creatives-list-grid">
                {Boolean(creatives.length) && creatives.map((creative: CreativeDataType) => (
                    <CreativesListItem creative={creative} hasLiked={false} />
                ))}
            </div>
        </div>
    )
}

export default CreativesList;