import * as React from 'react';
import { z } from 'zod';
import { useFieldArray, useForm, useFormContext, useWatch } from 'react-hook-form';
import { add } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, CalendarIcon, DeleteIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select-input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { CalendarInput } from '@/components/ui/calendar-input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Text } from '@/components/text';
import { useInvoices } from '@/components/invoice-list-provider';
import { formatDate } from '@/lib/utils';
import { InvoiceDetails, InvoiceItem } from '@/lib/types';
import { useInvoiceDetails } from '@/app/[id]/_hooks/use-invoice-details';

const formSchema = z.object({
  senderAddress: z.object({
    street: z.string().min(1, { message: "Can't be empty" }),
    city: z.string().min(1, { message: "Can't be empty" }),
    postCode: z.string().min(1, { message: "Can't be empty" }),
    country: z.string().min(1, { message: "Can't be empty" })
  }),
  clientName: z.string().min(1, { message: "Can't be empty" }),
  clientEmail: z
    .string()
    .min(1, { message: "Can't be empty" })
    .email({ message: 'Invalid email address' }),
  clientAddress: z.object({
    street: z.string().min(1, { message: "Can't be empty" }),
    city: z.string().min(1, { message: "Can't be empty" }),
    postCode: z.string().min(1, { message: "Can't be empty" }),
    country: z.string().min(1, { message: "Can't be empty" })
  }),
  description: z.string().min(1, { message: "Can't be empty" }),
  paymentTerms: z.string(),
  createdAt: z.date({ required_error: '' }),
  items: z
    .object({
      name: z.string().min(1, { message: "Can't be empty" }),
      quantity: z.coerce.number(),
      price: z.coerce.number()
    })
    .array()
});

type FormValues = z.infer<typeof formSchema>;

function SenderAddressFields() {
  const form = useFormContext();
  return (
    <div className="space-y-6">
      <h3 className="text-[15px] leading-none font-bold -tracking-[0.25px] text-[#7C5DFA]">
        Bill From
      </h3>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormField
          name="senderAddress.street"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-3">
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="senderAddress.city"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="senderAddress.postCode"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Post Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="senderAddress.country"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function ClientFields() {
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-[15px] leading-none font-bold -tracking-[0.25px] text-[#7C5DFA]">
        Bill To
      </h3>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormField
          name="clientName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-3">
              <FormLabel>Client&apos;s Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="clientEmail"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-3">
              <FormLabel>Client&apos;s Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="e.g. email@example.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="clientAddress.street"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-3">
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="clientAddress.city"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="clientAddress.postCode"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Post Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="clientAddress.country"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function InvoiceDetailsFields() {
  const form = useFormContext();
  return (
    <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
      <FormField
        name="createdAt"
        control={form.control}
        render={({ field }) => (
          <FormItem className="md:col-span-1">
            <FormLabel>Invoice Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <button className="dark:ring:border-[#7C5DFA] relative inline-flex w-full cursor-pointer items-center justify-between rounded-sm border border-[#DFE3FA] bg-white px-5 py-[1.125rem] text-[0.9375rem] leading-none font-bold -tracking-[0.25px] text-[#0C0E16] outline-none hover:border-[#7C5DFA] focus:border-[#7C5DFA] dark:border-[#252945] dark:bg-[#1E2139] dark:text-white dark:hover:border-[#7C5DFA]">
                    {field.value ? formatDate(field.value) : <span>Pick a date</span>}
                    <span className="absolute inset-y-0 right-4 flex items-center justify-center">
                      <CalendarIcon className="text-[#7E88C3]" aria-hidden="true" />
                    </span>
                  </button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent>
                <CalendarInput
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <FormField
        name="paymentTerms"
        control={form.control}
        render={({ field }) => (
          <FormItem className="md:col-span-1">
            <FormLabel>Payment Terms</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Net 1 Day</SelectItem>
                <SelectItem value="7">Net 7 Days</SelectItem>
                <SelectItem value="14">Net 14 Days</SelectItem>
                <SelectItem value="30">Net 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Project Description</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Graphic Design Service" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

function InvoiceItemsFields() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items'
  });

  const { items } = useWatch({ control: form.control });

  return (
    <div className="mt-[4.375rem]">
      <h3 className="text-lg leading-8 font-bold -tracking-[-0.38px] text-[#777F98]">Item List</h3>
      <div className="mt-8 space-y-12 md:space-y-[1.125rem]">
        {fields.map((fieldItem, index) => (
          <div key={fieldItem.id} className="space-y-6 md:flex md:space-y-0 md:gap-x-4">
            <FormField
              name={`items.${index}.name` as const}
              render={({ field }) => (
                <FormItem className="space-y-3.5 md:w-2/5">
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-x-4 md:w-3/5">
              <FormField
                name={`items.${index}.quantity` as const}
                render={({ field }) => (
                  <FormItem className="w-3/12 flex-auto space-y-2 md:space-y-3.5">
                    <FormLabel>Qty.</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name={`items.${index}.price` as const}
                render={({ field }) => (
                  <FormItem className="w-4/12 flex-auto space-y-2 md:space-y-3.5">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="w-5/12 flex-auto space-y-2 md:space-y-3.5">
                <Text>Total</Text>
                <div className="flex items-center justify-between gap-x-16 md:gap-x-0">
                  <Input
                    type="text"
                    value={(
                      (items?.at(index)?.quantity ?? 0) * (items?.at(index)?.price ?? 0)
                    ).toFixed(2)}
                    readOnly
                    className="pointer-events-none border-none bg-transparent px-0 text-[#888EB0] ring-0 focus:ring-0 dark:bg-transparent dark:text-[#888EB0] dark:ring-0"
                  />
                  <button type="button" className="cursor-pointer" onClick={() => remove(index)}>
                    <span className="sr-only">Remove item</span>
                    <DeleteIcon className="text-[#888EB0] hover:text-[#EC5757]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="light"
        className="mt-12 w-full justify-center md:mt-[1.125rem]"
        onClick={() => append({ name: '', quantity: 0, price: 0 })}>
        + Add New Item
      </Button>
    </div>
  );
}

export function CreateInvoiceForm({
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof Sheet> & { open: boolean; onOpenChange: (open: boolean) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      createdAt: new Date(),
      senderAddress: {
        street: '',
        city: '',
        postCode: '',
        country: ''
      },
      clientName: '',
      clientEmail: '',
      clientAddress: {
        street: '',
        city: '',
        postCode: '',
        country: ''
      },
      description: '',
      paymentTerms: '',
      items: [
        {
          name: '',
          quantity: 0,
          price: 0
        }
      ]
    }
  });

  const { mutate, data } = useInvoices();

  function handleClose(open: boolean) {
    onOpenChange!(open);
    form.reset();
  }

  function generateRandomLetter() {
    const randomCharCode = Math.floor(Math.random() * 26) + 65;
    return String.fromCharCode(randomCharCode);
  }

  function generateInvoiceId(invoice: InvoiceItem | undefined) {
    if (!invoice) {
      const defaultStartNumber = 1001;
      const firstLetter = generateRandomLetter();
      const secondLetter = generateRandomLetter();
      return `${firstLetter}${secondLetter}${defaultStartNumber}`;
    }

    const firstLetter = generateRandomLetter();
    const secondLetter = generateRandomLetter();
    const parsedIdNumber = +invoice.id.slice(2);
    const newIdNumber = parsedIdNumber + 1;

    return `${firstLetter}${secondLetter}${newIdNumber}`;
  }

  async function onSubmit(values: FormValues) {
    const latestInvoice = data?.invoices.at(-1);
    const generatedInvoiceId = generateInvoiceId(latestInvoice);
    const paymentTerms = values.paymentTerms;
    const items = values.items.map(({ name, price, quantity }) => ({
      name,
      price,
      quantity,
      total: price * quantity
    }));
    const total = items.reduce((acc, curr) => acc + curr.total, 0);

    await mutate(
      {
        id: generatedInvoiceId,
        clientAddress: values.clientAddress,
        senderAddress: values.senderAddress,
        clientEmail: values.clientEmail,
        clientName: values.clientName,
        description: values.description,
        createdAt: values.createdAt.toISOString(),
        paymentDue:
          paymentTerms === '' ? null : add(values.createdAt, { days: +paymentTerms }).toISOString(),
        items,
        paymentTerms,
        status: 'pending',
        total
      },
      () => handleClose(false)
    );
  }

  async function onSaveDraft() {
    const latestInvoice = data?.invoices.at(-1);
    const generatedInvoiceId = generateInvoiceId(latestInvoice);
    const values = form.getValues();
    const paymentTerms = values.paymentTerms;
    const items = values.items.map(({ name, price, quantity }) => ({
      name,
      price,
      quantity,
      total: price * quantity
    }));
    const total = items.reduce((acc, curr) => acc + curr.total, 0);

    await mutate(
      {
        id: generatedInvoiceId,
        clientAddress: values.clientAddress,
        senderAddress: values.senderAddress,
        clientEmail: values.clientEmail,
        clientName: values.clientName,
        description: values.description,
        createdAt: values.createdAt.toISOString(),
        paymentDue:
          paymentTerms === '' ? null : add(values.createdAt, { days: +paymentTerms }).toISOString(),
        items,
        paymentTerms,
        status: 'draft',
        total
      },
      () => handleClose(false)
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleClose} {...props}>
      <SheetContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-[calc(100%-80px)] w-full flex-col px-6 py-8 md:px-14 md:py-[3.75rem] lg:h-full">
            <div className="flex-1 overflow-y-auto px-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[#DFE3FA] dark:[&::-webkit-scrollbar-thumb]:bg-[#252945] [&::-webkit-scrollbar-track]:bg-transparent">
              <SheetHeader>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-x-6 text-[15px] font-bold -tracking-[0.25px] text-[#0C0E16] md:hidden dark:text-white"
                  onClick={() => handleClose(false)}>
                  <ArrowLeftIcon />
                  <span>Go Back</span>
                </button>
                <SheetTitle className="text-2xl leading-8 font-bold -tracking-[0.5px] text-[#0C0E16] dark:text-white">
                  New Invoice
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-10 md:mt-[2.875rem]">
                <SenderAddressFields />
                <ClientFields />
                <InvoiceDetailsFields />
                <InvoiceItemsFields />
              </div>
            </div>
            <div className="-mx-6 h-4 flex-none bg-transparent md:-mx-14 md:h-20" />
            <div className="md:rounde-tr relative -mx-6 -mb-8 flex flex-none justify-center gap-x-2 bg-white px-6 py-5 md:-mx-14 md:-my-[3.75rem] md:justify-start md:px-14 dark:bg-[#1E2139]">
              <Button
                type="button"
                variant="light"
                className="p-4 md:px-6"
                onClick={() => handleClose(false)}>
                Discard
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="p-4 md:ml-auto md:px-6"
                onClick={onSaveDraft}>
                Save as Draft
              </Button>
              <Button type="submit" variant="primary" className="p-4 md:px-6">
                Save & Send
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

const updateFormSchema = formSchema.omit({ items: true }).extend({
  items: z
    .object({
      id: z.coerce.number(),
      name: z.string().min(1, { message: "Can't be empty" }),
      quantity: z.coerce.number(),
      price: z.coerce.number()
    })
    .array()
});

type UpdateFormValues = z.infer<typeof updateFormSchema>;

export function UpdateInvoiceForm({
  open,
  onOpenChange,
  invoice,
  ...props
}: React.ComponentProps<typeof Sheet> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: InvoiceDetails;
}) {
  const { mutate } = useInvoiceDetails();
  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      createdAt: new Date(invoice.createdAt),
      senderAddress: invoice.senderAddress,
      clientAddress: invoice.clientAddress,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      description: invoice.description,
      paymentTerms: invoice.paymentTerms,
      items: invoice.items
    }
  });

  function handleClose(open: boolean) {
    onOpenChange!(open);
    form.reset();
  }

  async function onSubmit(values: UpdateFormValues) {
    const paymentTerms = values.paymentTerms;
    const items = values.items.map(({ id, name, price, quantity }) => ({
      id,
      name,
      price,
      quantity,
      total: price * quantity
    }));
    const total = items.reduce((acc, curr) => acc + curr.total, 0);

    await mutate(
      invoice.id,
      {
        clientAddress: values.clientAddress,
        senderAddress: values.senderAddress,
        clientEmail: values.clientEmail,
        clientName: values.clientName,
        description: values.description,
        createdAt: values.createdAt.toISOString(),
        paymentDue: add(values.createdAt, { days: +paymentTerms }).toISOString(),
        status: invoice.status === 'draft' ? 'pending' : invoice.status,
        items,
        paymentTerms,
        total
      },
      () => handleClose(false)
    );

    form.setValue('clientName', values.clientName);
    form.setValue('clientEmail', values.clientEmail);
    form.setValue('description', values.description);
    form.setValue('clientAddress', values.clientAddress);
    form.setValue('senderAddress', values.senderAddress);
    form.setValue('createdAt', values.createdAt);
    form.setValue('paymentTerms', values.paymentTerms);
    form.setValue('items', values.items);
  }

  return (
    <Sheet open={open} onOpenChange={handleClose} {...props}>
      <SheetContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-[calc(100%-80px)] w-full flex-col px-6 py-8 md:px-14 md:py-[3.75rem] lg:h-full">
            <div className="flex-1 overflow-y-auto px-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[#DFE3FA] dark:[&::-webkit-scrollbar-thumb]:bg-[#252945] [&::-webkit-scrollbar-track]:bg-transparent">
              <SheetHeader>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-x-6 text-[15px] font-bold -tracking-[0.25px] text-[#0C0E16] md:hidden dark:text-white"
                  onClick={() => handleClose(false)}>
                  <ArrowLeftIcon />
                  <span>Go Back</span>
                </button>
                <SheetTitle className="text-2xl leading-8 font-bold -tracking-[0.5px] text-[#0C0E16] dark:text-white">
                  Edit <span className="text-[#888EB0]">#</span>
                  {invoice.id}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-10 md:mt-[2.875rem]">
                <SenderAddressFields />
                <ClientFields />
                <InvoiceDetailsFields />
                <InvoiceItemsFields />
              </div>
            </div>
            <div className="-mx-6 h-4 flex-none bg-transparent md:-mx-14 md:h-20" />
            <div className="md:rounde-tr relative -mx-6 -mb-8 flex flex-none justify-center gap-x-2 bg-white px-6 py-5 md:-mx-14 md:-my-[3.75rem] md:justify-end md:px-14 dark:bg-[#1E2139]">
              <Button
                type="button"
                variant="light"
                className="p-4 md:px-6"
                onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="p-4 md:px-6">
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
