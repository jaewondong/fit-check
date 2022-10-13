import React from 'react';
import checkFit from '../assets/images/checkFit.png';
import rgbColorWheel from '../assets/images/rgbColorWheel.png';
import colorCatags from '../assets/images/colorCatags.png';
import mono from '../assets/images/mono.png';
import monoOutfit from '../assets/images/monoOutfit.png';
import analog from '../assets/images/analog.png';
import analogOutfit from '../assets/images/analogOutfit.png';
import comp from '../assets/images/comp.png';
import compOutfit from '../assets/images/compOutfit.png';

import '../stylesheets/Home.css';

export default function Home() {


    //Checks if the user has already logged in when the user enters the website
    //If true, direct the user to their closet.
    
    
    
    return (
        <div className='home'>  
            <div className='about-content'>
                <div className='row'>
                    <div className='about-item'>
                        <div className='welcome'>
                            <p className='headline'>
                                WELCOME TO {"\n"}
                                FIT CHECK</p>
                            <p className='headline-desc'>
                                Have you ever got tired of picking your outfit in the morning? {"\n"}
                                Fit Check can help you find your best outfits based on color theory!
                            </p>
                        </div>
                        <div className="checkingFit">
                            <img className="checkingFitImg" src={checkFit} alt = "woman picking an outfit" />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <h3 className="content-title">What is Color Theory?</h3>
                    <div className='about-item'>
                        <div className='about-text'>
                            <p>
                                We see colors every day. Red roses, green trees, blue skies.
                                We all know different colors can influence our emotions and some colors look good together, giving us pleasure.
                            </p>
                            <p>
                                Color theory is a practical guideline to illustrate these visual effects of color mixing and matching. 
                                It involves both scientific and artistic principles to determine relationships between colors.
                            </p> 
                            <p>
                                The basis of color theory lies in the color wheel, which was first introduced by Issac Newton in 1666.
                                The color wheel tells us a lot of things, ranging from how colors are formed to how colors interact with each other.
                            </p>
                            <p>
                                The color wheel on the right is an RGB color wheel, which stands for red, green, and blue.
                                The circle can be divided into three categories: primary colors, secondary colors, and tertiary colors.
                            </p>
                            
                        </div>
                        <div className='about-img'>
                            <img src={rgbColorWheel} alt="rgbColorWheel" />
                        </div>
                    
                    </div>
                    <div className="about-item">
                        <div className='about-img'>
                            <img src={colorCatags} alt="colorCatags" />
                        </div>
                        <div className='about-text'>
                            <p>
                                Primary colors in the RGB color wheel are red, green, and blue. They can be mixed together in various ways to create a broad range of colors.
                                When the primary colors are all combined, they form pure white color.
                            </p>
                            <p>
                                Secondary colors stem from primary colors. They are formed when two primary colors are mixed. Red and green produce cyan, 
                                green and blue make magneta, and red and blue generate yellow. 
                            </p>
                            <p>
                                Teritary colors are mixture of a secondary color and a primary color. There are six tertiary colors in the RGB color wheel: 
                                azure, chartreuse green, spring green, orange, violet, and rose.
                            </p>
                            <p>
                                Combinations of these colors can form aesthetically pleasing look, called color harmony. We can use color scheme
                                rules to find harmonic colors.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <h3 className="content-title">Color Schemes</h3>
                    
                    <div className='about-item opp'>
                        <div className='about-text'>
                            <h3>Monochromatic</h3>
                            <p>
                                Monochromatic color schemes are produced from a single base color and etended using its shades, tones, and tints, basically the "lightness" of a color.
                            </p>
                            <p>
                                Outfits with monochromatic color schemes give a very simple yet calm look. They can add dimensions to your look, which is why many people enjoy wearing them.
                            </p>
                        </div>
                        <div className='about-img'>
                            <img src={mono} alt="mono" />
                        </div>
                        <div className='about-img'>
                            <img src={monoOutfit} alt="monoOutfit" />
                        </div>
                    </div>
                    <div className='about-item'>
                        <div className='about-img'>
                            <img src={analog} alt="analog" />
                        </div>
                        <div className='about-img'>
                            <img src={analogOutfit} alt="analogOutfit" />
                        </div>
                        <div className='about-text'>
                            <h3>Analogous</h3>
                            <p>
                                Analogous color schemes are colors that are placed side by side on the color wheel. In broader terms, the colors are analogous when they are similar to each other, such as red and orange.
                            </p>
                            <p>
                                Analogous outfits can make you look energetic and visually pleasing, because they are cohesive and create contrast.
                            </p>
                        </div>
                    </div>
                    <div className='about-item opp'>
                        <div className='about-text'>
                            <h3>Complementary</h3>
                            <p>
                                Complementary color schemes are two colors that are on opposit sides of the color circle. This color combination creates a very high contrast.
                            </p>
                            <p>
                                Outfits with complementary colors produce a very strong contrast and energy. They can make you feel more powerful and confident!
                            </p>
                        </div>
                        <div className='about-img'>
                            <img src={comp} alt="comp" />
                        </div>
                        <div className='about-img'>
                            <img src={compOutfit} alt="compOutfit" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h3 className="content-title">Ready to Explore?</h3>
                    <div className='about-item'>
                        <div className='about-text'>
                            <h3 style={{"text-align": "center"}} className="last-text">Fit check uses these color combination rules to find the best outfits from your closet! {"\n"}
                            If you are ready to explore, please <a href="/signup">signup</a> or continue as <a href="/guest">guest</a>. </h3>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

