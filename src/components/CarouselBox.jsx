import { Component, PropTypes } from 'react';
import { Flex, Carousel } from 'UI';

export default class CarouselBox extends Component {
    static propTypes = {
        options: PropTypes.object.isRequired,
        dataSource: PropTypes.array.isRequired
    }
    render() {
        const { options, dataSource } = this.props;
        return (
            <div className="carousel-wrapper">
                <Carousel {...options}>
                    {
                        dataSource.map((item, i) => (
                            <Flex key={i}
                                justify="center"
                                className="flex-container-justify carousel-item"
                                style={{
                                    backgroundImage: `url(${item})`
                                }}
                            />
                        ))
                    }
                </Carousel>
            </div>
        );
    }
}
