import React from "react";
import ReactQuill from "react-quill";

export const TextEditor = (props) => {
	const { value, onChange, format, defaultValue } = props;
	const editor = React.useRef(null);
	const handleChange = (value) => {
		return onChange?.(value);
	};
	React.useEffect(() => {
		if(format !== null) {
			for(const key in format) {
				editor.current.editor.format(key, format[key]);
			}
		}
	}, [value]);
	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline", "link", "image"],
			[{ list: "ordered" }, { list: "bullet" }],
			["clean"],
		],
	};
	return (
		<ReactQuill
			modules={modules}
			theme="snow"
			value={value}
			ref={editor}
			onChange={handleChange}
			defaultValue={defaultValue}
		/>
	);
};
