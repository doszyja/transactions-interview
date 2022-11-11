
import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

interface InputProps {
	placeholder?: string;
	name: string;
	type: string;
	step?: string;
	min?: string;
	className?: string;
	value?: string | number;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, name, type, step, min, className, value, onChange }: InputProps) => {

	return <input className={classNames(styles.input, (className ? className : ''))}
		name={name}
		type={type}
		step={step}
		min={min}
		value={value}
		placeholder={placeholder}
		onChange={(event) => {
			if (onChange) {
				onChange(event);
			}
		}} />;
};

export default Input;
