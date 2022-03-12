import React, { useState, useEffect } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

const HkStudentForm = (props) => {
	const [student, setStudent] = useState({});
	const { regno } = props;

	useEffect(() => {
		axios.get(`${URL}/api/students/${regno}`).then((res) => {
			console.log(res.data);
			setStudent(res.data);
		});
	}, [regno]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setStudent({ ...student, [name]: value });
	};

	const handleSave = () => {
		axios.patch(`${URL}/api/students/update`, student).then((res) => {
			if (res.status === 200) {
				props.showUpdated(res.data);
			}
		});
	};

	return (
		<div>
			<div>
				<table>
					<tbody>
						{Object.keys(student).map((k, i) => (
							<tr key={i}>
								<th style={{ textAlign: 'right' }}>{k}:</th>
								<td>
									{k !== '_id' ? (
										<input type='text' name={k} value={student[k]} onChange={handleChange} />
									) : (
										student[k]
									)}
								</td>
							</tr>
						))}
						<tr>
							<th></th>
							<td>
								<button onClick={handleSave}>Save</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<pre>{JSON.stringify(student, null, 2)}</pre>
			</div>
		</div>
	);
};

export default HkStudentForm;
