import Container from 'react-bootstrap/esm/Container';
import Carousel from 'react-bootstrap/Carousel';

import slide1 from '../static/451428_an abandoned pirate ship in the middle of the jung_xl-1024-v1-0.png';
import slide2 from '../static/611728_A beautify view of skyscraper with flying whales a_xl-1024-v1-0.png';
import slide3 from '../static/626665_a robotic lion sleeping on scenic cloud, with stun_xl-1024-v1-0.png';

import React from 'react';

function AutoCarousel() {
    return (
        <Container>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img width={1536} height={640} src={slide1} alt="slide1" />
                    <Carousel.Caption>
                        <h1>Making your dreams come true</h1>
                        <p>Generate amazing AI Art images from text using Stable Diffusion</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img width={1536} height={640} src={slide2} alt="slide2" />
                    <Carousel.Caption>
                        <h1>Easy to use</h1>
                        <p>It can create high quality images of anything you can imagine in seconds–just type in a text prompt and hit Generate.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={1536} height={640} src={slide3} alt="slide3" />
                    <Carousel.Caption>
                        <h1>Freedom</h1>
                        <p>No limitations on what you can enter.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

export default AutoCarousel;