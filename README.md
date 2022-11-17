# react-daterange-picker

A react date range picker using mui components forked from <a href='https://www.npmjs.com/package/@matharumanpreet00/react-daterange-picker'>.

## Usage

```bash
npm install @maxstudener/react-mui-daterange-picker --save
# or with yarn
yarn add @maxstudener/react-mui-daterange-picker
```

## Basic Example

```tsx
import React from "react";
import { DateRangePicker, DateRange } from "@maxstudener/react-mui-daterange-picker";

type Props = {}
type State = {
    dateRange: DateRange
}

class App extends React.Component<Props, State> {
	state = {
		dateRange: {}
	};

	render() {
		return (
			<DateRangePicker
				onChange={range => this.setState({ dateRange: range })}
			/>
		);
	}
}

export default App;
```

## Basic example using hooks

```tsx
import React from "react";
import { DateRangePicker, DateRange } from "@maxstudener/react-mui-daterange-picker";

type Props = {}

const App: React.FunctionComponent<Props> = props => {
	const [dateRange, setDateRange] = React.useState<DateRange>({});

	return (
		<DateRangePicker
			onChange={range => setDateRange(range)}
		/>
	);
}

export default App;
```

## Types

```ts
interface DateRange {
    startDate?: Date,
    endDate?: Date
}

interface DefinedRange {
    label: string,
    startDate: Date,
    endDate: Date
}
```

## Props

Name | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
`initialDateRange` | `DateRange` | | `{}` | initially selected date range
`minDate` | `Date | string` | | 10 years ago | min date allowed in range
`maxDate` | `Date | string` | | 10 years from now | max date allowed in range
`onChange` | `(DateRange) => void` | _required_ | - | handler function for providing selected date range
`definedRanges` | `DefinedRange[]` | | - | custom defined ranges to show in the list
