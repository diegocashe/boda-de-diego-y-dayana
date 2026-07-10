import * as React from 'react';

import { cn } from '@/lib/utils';

interface TabsContextValue {
    value: string;
    setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(component: string) {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error(`<${component} /> must be used within <Tabs />`);
    }
    return context;
}

interface TabsProps extends React.ComponentProps<'div'> {
    value: string;
    onValueChange: (value: string) => void;
}

function Tabs({ value, onValueChange, className, children, ...props }: TabsProps) {
    return (
        <TabsContext.Provider value={{ value, setValue: onValueChange }}>
            <div data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

function TabsList({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            role="tablist"
            data-slot="tabs-list"
            className={cn('inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-1', className)}
            {...props}
        />
    );
}

interface TabsTriggerProps extends React.ComponentProps<'button'> {
    value: string;
}

function TabsTrigger({ value, className, ...props }: TabsTriggerProps) {
    const { value: activeValue, setValue } = useTabsContext('TabsTrigger');
    const isActive = value === activeValue;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            data-state={isActive ? 'active' : 'inactive'}
            data-slot="tabs-trigger"
            onClick={() => setValue(value)}
            className={cn(
                "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:shadow-sm dark:text-muted-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
                className,
            )}
            {...props}
        />
    );
}

interface TabsContentProps extends React.ComponentProps<'div'> {
    value: string;
}

function TabsContent({ value, className, ...props }: TabsContentProps) {
    const { value: activeValue } = useTabsContext('TabsContent');
    if (value !== activeValue) {
        return null;
    }

    return <div role="tabpanel" data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
