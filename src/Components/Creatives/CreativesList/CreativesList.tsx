import React, { FC } from "react";
import { useFetchAllCreativesByDataQuery } from "@/store/wordpress/wpRestApi";
import CreativesListItem from "../CreativesListItem";
import { CreativeDataType } from "@/types/components/Creative";

interface CreativesListPropsType {
    perPage: number
}

const CreativesList: FC<CreativesListPropsType> = ({ perPage = 10 }) => {

    const { data: creatives = [], isLoading, isError, error } = useFetchAllCreativesByDataQuery({ per_page: perPage, offset: 0 });

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