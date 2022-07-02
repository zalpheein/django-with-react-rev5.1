import React from "react";
import { Card } from "antd";
import "./StroyList.scss";


function StoryList({ style }) {
    return (
        <div style={ style }>
            <Card title="Stories" size="small">
                    Stories from people you follow will shwo up here.
            </Card>
        </div>
    );
}

export default StoryList;

