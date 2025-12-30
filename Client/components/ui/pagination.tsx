import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { Button } from './button'
import { useAppDispatch } from '@/hooks/use-app-dispatch';

type PaginationPropsType = {
    page: number;
    totalPages: number;
    setPage?: (page: number) => void;
}
const Pagination: React.FC<PaginationPropsType> = ({ page, totalPages, setPage }) => {
    const dispatch = useAppDispatch();

    return (
        <>
            {/* Pagination  */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        onClick={() => dispatch(setPage?.(page - 1) as any)}
                        disabled={page === 1}
                        variant="outline"
                        size="sm"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                        Page {page} de {totalPages}
                    </span>
                    <Button
                        onClick={() => dispatch(setPage?.(page + 1) as any)}
                        disabled={page === totalPages}
                        variant="outline"
                        size="sm"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </>
    )
}

export default Pagination