'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })

    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  description: z
    .string()
    .min(2, {
      message: 'Description must be at least 2 characters.',
    })
    .max(100, {
      message: 'Description must not be longer than 30 characters.',
    }),
  owner: z.string({}).email(),
  createdAt: z.string({}),
  id: z.string({}),
  status: z.boolean({}),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function SettingsForm({ program }: any) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: program.name,
      description: program.description,
      owner: program.owner,
      status: program.status,
      id: program.id,
      createdAt: program.createdAt,
    },
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {}

  return (
    <div className=" space-y-4">
      <div>
        <h3 className=" text-3xl font-extrabold">Program Settings</h3>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Program Information</h3>
        <p className="text-sm text-muted-foreground">Program details.</p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} value={program.name} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} value={program.description} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="owner"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Owner</FormLabel>
                <FormControl>
                  <Input disabled {...field} value={program.owner} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }: any) => (
              <FormItem className="">
                <FormLabel className="block mb-2">Status</FormLabel>
                <FormControl>
                  <Switch />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h3 className="text-lg font-medium">Program Information</h3>
            <p className="text-sm text-muted-foreground">Program details.</p>
          </div>
          <Separator />
          <FormField
            control={form.control}
            name="id"
            render={({ field }: any) => (
              <FormItem className="mt-2">
                <FormLabel>Id</FormLabel>
                <FormControl>
                  <Input disabled {...field} value={program.id} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Created At</FormLabel>
                <FormControl>
                  <Input disabled {...field} value={program.createdAt} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  );
}
