import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
return (
	<Box>
	
	<Container>
		<Row>
		<Column>
			<Heading>About Us</Heading>
			<FooterLink href="#">Aim</FooterLink>
			<FooterLink href="#">Vision</FooterLink>
			<FooterLink href="#">Testimonials</FooterLink>
		</Column>
		<Column>
			<Heading>Services</Heading>
			<FooterLink href="#">Selling products</FooterLink>
			<FooterLink href="#">Auction</FooterLink>
			<FooterLink href="#">Delivery</FooterLink>
			
		</Column>
		<Column>
			<Heading>Contact Us</Heading>
			<FooterLink href="#">weyegebeya@gmail.com</FooterLink>
			<FooterLink href="#">+251978654325</FooterLink>
			<FooterLink href="#">Addis Ababa around Dembel</FooterLink>
			<FooterLink href="#"></FooterLink>
		</Column>
		<Column>
			<Heading>Social Media</Heading>
			
			<FooterLink href="#">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				<FaFacebookF />
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				<FaInstagram />
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				<FaTwitter />
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				<FaYoutube />
				</span>
			</i>
			</FooterLink>
		</Column>
		
		</Row>
		<p style={{ color:'white',alignContent:'center',marginLeft:'400px' }}>Copyright © 2023 weye gebeya</p>
		
	</Container>
	</Box>
);
};
export default Footer;
