const fs = require("fs");
const sizeOf = require('image-size');

import Head from 'next/head';

import ISS from '../components/image_slideshow';
import home_styles from '../styles/Home.module.css';
import message_styles from '../styles/Message.module.css';

import React, { useState, useEffect, useRef } from "react";

export default function Home(props) {
	let [index, setIndex] = useState(0);
	const timeoutRef = useRef(null);
	const delay = 8000;

	let resetTimeout = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}

	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(
			() =>
				setIndex((prevIndex) =>
					prevIndex === props.main_obj.files.length - 1 ? 0 : prevIndex + 1
				),
			delay
		);

		return () => {
			resetTimeout();
		};
	}, [index]);


	return (
		<>
			<Head>
				<title>Welcome Home Presentation</title>
				<meta name="welcome home presentation" content="made with nextjs" />
			</Head>
			<main className={home_styles.main_div}>
				<div className={`${home_styles.section_01}`}>
					<h1>HAPPY FATHERS DAY!</h1>
				</div>
				<ISS p_main_images={props.main_obj.files} p_index={index}/>
					<br/>
					<br/>
				<div className={message_styles.message_cluster}>
					<Message name="Gian">
						<p>Thank you for all your sacrifices papa. Happy Fathers Day!</p>
					</Message>
					<Message name="Gillian">
						<p>Happy Fathers Day!</p>
					</Message>
					<Message name="Reina">
						<p>Thank you for all the sacrifices you have done all these years</p>
					</Message>
					<Message name="Christine">
						<p>[message_not_found]</p>
					</Message>
				</div>
			</main>
		</>
	)
}

const Message = (props) => {
	return (
		<div className={message_styles.message_container}>
			<div className={message_styles.message_inner}>
				{props.children}
				<name>- {props.name}</name>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const image_path = "public/img/profile";

	let img_obj = {
		files: [],
	}

	let image_names = fs.readdirSync(image_path);
	console.log(image_names);
	for (let i = 0; i < image_names.length; i++) {
		let m_width = sizeOf(`${image_path}/${image_names[i]}`).width;
		let m_height = sizeOf(`${image_path}/${image_names[i]}`).height;
		img_obj.files.push({
			filename: image_names[i],
			width: Math.round(m_width),
			height: Math.round(m_height),
		});
	}

	return {
		props: {
			main_obj: img_obj
		},
		revalidate: 60
	}
}