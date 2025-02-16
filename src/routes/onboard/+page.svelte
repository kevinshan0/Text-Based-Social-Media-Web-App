<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { onboardSchema, type OnboardSchema } from '$lib/formSchema.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import {
		Calendar as CalendarPrimitive,
		type CalendarRootProps,
		type WithoutChildrenOrChild
	} from 'bits-ui';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import * as Calendar from '$lib/components/ui/calendar';
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils.js';
	import * as Popover from '$lib/components/ui/popover';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	let {
		data,
		value = $bindable(),
		placeholder = $bindable(),
		weekdayFormat,
		class: className,
		...restProps
	}: {
		data: { form: SuperValidated<Infer<OnboardSchema>> };
	} & WithoutChildrenOrChild<CalendarRootProps> = $props();

	const form = superForm(data.form, {
		validators: zodClient(onboardSchema)
	});

	const { form: formData, enhance } = form;

	const df = new DateFormatter('en-US', {
		month: 'long'
	});

	const monthOptions = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	].map((month, i) => ({ value: String(i + 1), label: month }));

	const yearOptions = Array.from({ length: 100 }, (_, i) => ({
		label: String(new Date().getFullYear() - i),
		value: String(new Date().getFullYear() - i)
	}));

	const defaultYear = $derived(
		placeholder ? {
		    value: String(placeholder.year),
			label: String(placeholder.year)
		} : undefined
	);

	const defaultMonth = $derived(
		placeholder ? {
			value: String(placeholder.month),
			label: df.format(placeholder.toDate(getLocalTimeZone()))
		} : undefined
	);

	const monthLabel = $derived(
		monthOptions.find((m) => m.value === defaultMonth?.value)?.label ?? 'Select a month'
	);

	const yearLabel = $derived(
		yearOptions.find((y) => y.value === defaultYear?.value)?.label ?? 'Select a year'
	);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>User Info</Card.Title>
		<Card.Description>Please enter your information.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
            <!-- first_name -->
			<Form.Field {form} name="first_name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>First name</Form.Label>
						<Input {...props} bind:value={$formData.first_name} />
					{/snippet}
				</Form.Control>
				<Form.Description>Enter your first name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
            <!-- last_name -->
			<Form.Field {form} name="last_name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Last name</Form.Label>
						<Input {...props} bind:value={$formData.last_name} />
					{/snippet}
				</Form.Control>
				<Form.Description>Enter your last name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<!-- username -->
			<Form.Field {form} name="username">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Username</Form.Label>
						<Input {...props} bind:value={$formData.username} />
					{/snippet}
				</Form.Control>
				<Form.Description>This is your public display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<!-- birthdate -->
			<Form.Field {form} name="birthdate" class="flex flex-col">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Date of birth</Form.Label>
						<Popover.Root>
							<Popover.Trigger
								{...props}
								class={cn(
									buttonVariants({ variant: 'outline' }),
									'w-[280px] justify-start pl-4 text-left font-normal',
									!value && 'text-muted-foreground'
								)}
							>
								{value ? df.format((value as DateValue).toDate(getLocalTimeZone())) : 'Pick a date'}
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="top">
								<CalendarPrimitive.Root
									{weekdayFormat}
									class={cn('rounded-md border p-3', className)}
									bind:value={value as never}
									bind:placeholder
									{...restProps}
								>
									{#snippet children({ months, weekdays })}
										<Calendar.Header>
											<Calendar.Heading class="flex w-full items-center justify-between gap-2">
												<Select.Root
													type="single"
													value={defaultMonth?.value}
													onValueChange={(v) => {
														if (!placeholder) return;
														if (v === `${placeholder.month}`) return;
														placeholder = placeholder.set({ month: Number.parseInt(v) });
													}}
												>
													<Select.Trigger aria-label="Select month" class="w-[60%]">
														{monthLabel}
													</Select.Trigger>
													<Select.Content class="max-h-[200px] overflow-y-auto">
														{#each monthOptions as { value, label }}
															<Select.Item {value} {label} />
														{/each}
													</Select.Content>
												</Select.Root>
												<Select.Root
													type="single"
													value={defaultYear?.value}
													onValueChange={(v) => {
														if (!v || !placeholder) return;
														if (v === `${placeholder?.year}`) return;
														placeholder = placeholder.set({ year: Number.parseInt(v) });
													}}
												>
													<Select.Trigger aria-label="Select year" class="w-[40%]">
														{yearLabel}
													</Select.Trigger>
													<Select.Content class="max-h-[200px] overflow-y-auto">
														{#each yearOptions as { value, label }}
															<Select.Item {value} {label} />
														{/each}
													</Select.Content>
												</Select.Root>
											</Calendar.Heading>
										</Calendar.Header>
										<Calendar.Months>
											{#each months as month}
												<Calendar.Grid>
													<Calendar.GridHead>
														<Calendar.GridRow class="flex">
															{#each weekdays as weekday}
																<Calendar.HeadCell>
																	{weekday.slice(0, 2)}
																</Calendar.HeadCell>
															{/each}
														</Calendar.GridRow>
													</Calendar.GridHead>
													<Calendar.GridBody>
														{#each month.weeks as weekDates}
															<Calendar.GridRow class="mt-2 w-full">
																{#each weekDates as date}
																	<Calendar.Cell {date} month={month.value}>
																		<Calendar.Day />
																	</Calendar.Cell>
																{/each}
															</Calendar.GridRow>
														{/each}
													</Calendar.GridBody>
												</Calendar.Grid>
											{/each}
										</Calendar.Months>
									{/snippet}
								</CalendarPrimitive.Root>
							</Popover.Content>
						</Popover.Root>
						<Form.Description>Select your birthdate.</Form.Description>
						<Form.FieldErrors />
						<Input hidden {...props} value={$formData.birthdate} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			<Button type="submit">Submit</Button>
		</form>
	</Card.Content>
</Card.Root>
